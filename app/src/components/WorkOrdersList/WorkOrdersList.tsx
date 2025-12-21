import { Box, Spinner, Text, DataList, Stack, Badge } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type Task = {
  id: string;
  title: string;
  description: string;
}

type WorkOrder = {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export const WorkOrdersList: React.FC = () => {
  const { data: workOrders, isLoading } = useQuery({
    queryKey: ['work-orders'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/work-orders');
      return response.json() as Promise<WorkOrder[]>;
    }
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (!workOrders || workOrders.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="fg.muted">No work orders found</Text>
      </Box>
    );
  }

  return (
      <Box maxH="calc(100vh - 12rem)" w="md" overflowY="auto" gap={6}>
        {workOrders.map((workOrder) => (
            <Box
                key={workOrder.id}
                bg="bg.panel"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="border.emphasized">
                <DataList.Root>
                    <DataList.Item>
                    <DataList.ItemLabel>Title</DataList.ItemLabel>
                    <DataList.ItemValue>{workOrder.title}</DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item>
                    <DataList.ItemLabel>Description</DataList.ItemLabel>
                    <DataList.ItemValue>{workOrder.description}</DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item>
                    <DataList.ItemLabel>Tasks</DataList.ItemLabel>
                    <DataList.ItemValue>
                        <Stack gap={2}>
                        {workOrder.tasks.map((task) => (
                            <Badge key={task.id} colorScheme="blue">
                            {task.title}
                            </Badge>
                        ))}
                        </Stack>
                    </DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item>
                    <DataList.ItemLabel>Created At</DataList.ItemLabel>
                    <DataList.ItemValue>
                        {new Date(workOrder.createdAt).toLocaleString()}
                    </DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>
            </Box>
        ))}
    </Box>
  );
};

export default WorkOrdersList;
