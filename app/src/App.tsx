import {
  VStack,
  Container,
} from "@chakra-ui/react"
import { CreateWorkOrderForm } from "./components"

function App() {

  return (
    <Container maxW="container.md" py={8}>
      <VStack gap={6} align="stretch">
        <CreateWorkOrderForm />        
      </VStack>
    </Container>
  )
}

export default App
