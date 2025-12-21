import {
  Flex,
} from "@chakra-ui/react"
import { CreateWorkOrderForm, WorkOrdersList } from "./components"
import { Toaster } from "@/components/ui/toaster"

function App() {

  return (
    <>
      <Flex justify="center" py={8} px={8}>
        <Flex gap={6} wrap="wrap" align="flex-start" w="100%">
          <CreateWorkOrderForm />
          <WorkOrdersList />
        </Flex>
      </Flex>
      <Toaster />
    </> 
  )
}

export default App
