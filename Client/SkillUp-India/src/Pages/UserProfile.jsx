import SimpleBar from 'simplebar-react'
import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../helpers/index'
import Cover from '../Components/Cover'
import Nav from "../Components/Nav"
import { UserProfile } from '@clerk/clerk-react';
import "./User.css"

export default function UserProfilePage() {
  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <Nav/>
      <ChakraProvider theme={theme}>
              <Cover />
              <UserProfile />  
      </ChakraProvider>
    </SimpleBar>
  )
}
