import {
  VStack,
  Container,
} from "@chakra-ui/react"
import { CreateWorkOrderForm } from "./components"
import { Toaster } from "@/components/ui/toaster"

function App() {

  return (
    <>
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="stretch">
          <CreateWorkOrderForm />        
        </VStack>
      </Container>
      <Toaster />
    </>
  )
}

export default App
