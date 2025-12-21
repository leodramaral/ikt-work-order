import { Stack, Button, Box, Input, Fieldset, Textarea, Field, Spinner, createListCollection, Listbox } from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import createWorkOrderSchema from "./rules";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
}

interface FormData {
    title: string;
    description: string;
    tasks: string[];
}

export const CreateWorkOrderForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(createWorkOrderSchema),
        mode: "onChange",
        defaultValues: {
          title: "",
          description: "",
          tasks: [],
        }
    });

    const { data } = useQuery({
      queryKey: ['tasks'],      
      queryFn: async () => {
        const response = await fetch('http://localhost:3000/tasks');
        return response.json();
      }
    });

    const createWorkOrderMutation = useMutation({
      mutationFn: async (data: FormData) => {
        const response = await fetch('http://localhost:3000/work-orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            taskIds: data.tasks,
          }),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to create work order');
        }
        
        return response.json();
      },
      onSuccess: () => {
        toaster.create({
          title: "Success",
          description: "Work order created successfully!",
          type: "success",
        });
        reset();
      },
      onError: (error: Error) => {
        toaster.create({
          title: "Error",
          description: error.message,
          type: "error",
        });
      },
    });
    
    const handleFormSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
          await createWorkOrderMutation.mutateAsync(data);
        } finally {
          setIsSubmitting(false);
        }
    };

    return (
        <Box 
          as="form" 
          onSubmit={handleSubmit(handleFormSubmit)}
          bg="bg.panel"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="border.emphasized"
        >

          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>Create a Work Order</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your work order details below.
              </Fieldset.HelperText>
            </Stack>
          
            <Fieldset.Content>
              <Field.Root invalid={!!errors.title}>
                <Field.Label>Title</Field.Label>
                <Input
                  {...register("title")}
                />
                {errors.title && (
                  <Field.ErrorText>{errors.title.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.description}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  {...register("description")}
                />
                {errors.description && (
                  <Field.ErrorText>{errors.description.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.tasks}>
                <Field.Label>Tasks</Field.Label>
                {!data ? (
                  <Spinner size="md" />
                ) : Array.isArray(data) && data.length > 0 ? (
                  <Controller
                    name="tasks"
                    control={control}
                    render={({ field }) => (
                      <Listbox.Root 
                        collection={createListCollection({ 
                          items: data ?? [],
                          itemToString: (item) => item.title,
                          itemToValue: (item) => item.id,
                        })} 
                        selectionMode="multiple"
                        value={field.value}
                        onValueChange={(details) => field.onChange(details.value)}
                      >
                        <Listbox.Content>
                          {data.map((task: Task) => (
                            <Listbox.Item key={task.id} item={task}>
                              <Listbox.ItemText>{task.title}</Listbox.ItemText>
                              <Listbox.ItemIndicator />
                            </Listbox.Item>
                          ))}
                        </Listbox.Content>
                      </Listbox.Root>
                    )}
                  />
                ) : (
                  <Field.HelperText>Nenhuma tarefa encontrada.</Field.HelperText>
                )}
                {errors.tasks && (
                  <Field.ErrorText>{errors.tasks.message}</Field.ErrorText>
                )}
              </Field.Root>
            </Fieldset.Content>

            <Button 
              type="submit" 
              mt="4" 
              colorScheme="blue"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Submit"}
            </Button>
          </Fieldset.Root>
        </Box>
    )
}

export default CreateWorkOrderForm
