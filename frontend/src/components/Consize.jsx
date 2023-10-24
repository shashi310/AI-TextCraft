import { Box, Divider, Flex, Heading, Spacer, Spinner, useSafeLayoutEffect } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Select,Button,Input,Center } from '@chakra-ui/react'
import axios from 'axios';
import Navbar from './Navbar';

const Consize = () => {

  const [loading, setLoading] = useState(false);

  let str=["Embrace the journey, for it is the path that shapes us.",
  "In the garden of life, kindness is the most beautiful flower.",
  "Courage is not the absence of fear, but the triumph over it.",
  "The stars remind us that even in darkness, there is beauty.",
  "Wisdom whispers in the silence between our thoughts.",
  "Hope is the light that guides us through the darkest nights.",
  "Strength lies not in muscle, but in the will to persevere.",
  "Let your dreams be the compass that guides your steps.",
  "The greatest gift you can give is a piece of your heart.",
  "Every sunrise is a promise of a new beginning."]

  
const [res,setRes]=useState("")

  const [info,setInfo]=useState("")
  const [length,setLength]=useState("")
  const [keywords,setKeywords]=useState("")
// console.log(`genre-->`,genre);
// console.log(`language-->`,language);
// console.log(`keywords-->`,keywords);
const loggedInUser = JSON.parse(localStorage.getItem('AI-TextCraftUser'))||""
// console.log(loggedInUser.Accesstoken);


const handleClick=()=>{
  setLoading(true);
  const requestBody = {
    info: info,
    length: length,
    blockedWord: keywords
  }
  console.log(requestBody);
  
  axios.post('http://localhost:5000/text/consize', requestBody, {
  headers: {
    'Authorization': `${loggedInUser?.Accesstoken}`
  }
})
  .then(response => {
    console.log('Response:', response.data.content);
    // Handle the response data as needed
    console.log(response.data);
    setRes(response.data.content)
  })
  .catch(error => {
    console.error('Error:', error);
   
  })
  .finally(() => {
    setLoading(false);
  });

  

}

const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentQuoteIndex(prevIndex => prevIndex + 1);
      setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % str.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

// if(loading){
//   return(
//     <Box textAlign='center'>
//     <Spinner size='xl' color='teal.500' thickness='4px' />
//   </Box>
//   )
// }



  return (
//     background: rgb(63,94,251);
// background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
<>
<Navbar />
    <Flex>
      <Box border='2px' borderColor='gray.400' w="18%"  bgColor="#3f5efb" className='sidebar'>
    
      </Box>
      <Spacer />
<Box border='2px' borderColor='gray.400' w="64%" h="100vh" pl="1%" pr="1%" /* bgColor="bisque" */>
      
      <Flex mt="2%" className='main'>
      
     
       <Box>
       <Input value={info} onChange={(e)=>setInfo(e.target.value)} placeholder='Provide the information' />
       </Box>
       <Box>
       <Input value={keywords} onChange={(e)=>setKeywords(e.target.value)} placeholder='Unwanted Words (If Any)' />
       </Box>
       <Box>
       <Input value={length} onChange={(e)=>setLength(e.target.value)} placeholder='Required Consized length' />
       </Box>
       <Button colorScheme='green' onClick={handleClick}>Consize</Button>
      </Flex>
      

      {loading ? (
  <Box border='2px' borderColor='gray.400' p='5px' mx="10%" mt="10%">
    <Center bg='teal.500' fontSize='2xl' color='white' p="60px" className='res'>
      Loading...
    </Center>  
  </Box>
) : (
  res ? (
    <Box border='2px' borderColor='gray.400' p='5px' mx="1%" mt="4%">
      <Center bg='tomato' fontSize='24px' color='white' p="30px" className='res'>
        {res}
      </Center>  
    </Box>
  ) : (
    <Box border='2px' borderColor='gray.400' p='5px' mx="10%" mt="5%">
      <Center bg='tomato' fontSize='lg' color='white' p="40px" className='res'>
        Random Quotes
        <br />
        <br />        {str[currentQuoteIndex]}
      </Center>
    </Box>
  )
)}


    </Box>
    <Spacer />
     <Box border='2px' borderColor='gray.400' w="18%" h="100vh" bgColor="#3f5efb" className='sidebar'>
    
      </Box>
    </Flex>
    </>
  )
}

export default Consize