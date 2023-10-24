import { Box, Divider, Flex, Heading, Spacer, useSafeLayoutEffect,ListItem,List, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Select,Button,Input,Center } from '@chakra-ui/react'
import axios from 'axios';
import Navbar from './Navbar'

const History = () => {
  const [data,setRes]=useState([])
  const loggedInUser = JSON.parse(localStorage.getItem('AI-TextCraftUser'))
  console.log(loggedInUser.user._id);
  const token=loggedInUser.Accesstoken
const user=loggedInUser.user

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/history/${user._id}`);
      if (response.ok) {
        const jsonData = await response.json();
        setRes(jsonData);
        
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData();
}, []);


//pagination
const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

if(data){
  data.reverse();
}

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const reversedItems = [...currentItems]

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

useEffect(()=>{
console.log(currentPage);
},[currentPage])
  return (
    <div>
        <Navbar />  
        <Flex>   
      <Box border='2px' borderColor='gray.400' w="18%"  bgColor="#3f5efb" className='sidebar'>
      </Box>
      <Spacer />
<Box border='2px' borderColor='gray.400' w="64%" h="100vh"  /* bgColor="bisque" */>   
<Heading as='h3' size='xl' noOfLines={1}   color='green'h="50px" >History 
</Heading>
<Box>
      {data?.length > 0 ? (
        <Box>
          <Flex gap="20%">
          <Heading w="60%" fontSize='2xl' textAlign='center' mb='2' mt='2' color='teal.500'>
            History of {user.name}'s Interactions
          </Heading>
          <Select w="20%"  value={itemsPerPage} onChange={(e)=>setItemsPerPage(e.target.value)}>
            <option value="3">Items per page</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>

          </Select>
          </Flex>
          <List>
            {reversedItems.map((item, index) => (
              <Box
                key={index}
                mb='2'
                // w='10/12'
                mx='auto'
                borderWidth='1px'
                borderColor='teal.500'
                p='2'
                bgColor="aliceblue"
              >
                <ListItem>
                  <Box as='span'   fontWeight='semibold'>
                    Topic :
                  </Box>
                  {item.type}
                </ListItem>
                <ListItem>
                  <Box as='span'  fontWeight='semibold' mb='6'>
                    Response -{data.length - indexOfFirstItem - index}
                  </Box>
                  : {item.body}
                </ListItem>
                <ListItem>
                  <Box as='span'   fontWeight='semibold'>
                    Date :
                  </Box>
                  {item.date}
                </ListItem>
              </Box>
            ))}
          </List>

          <Flex justify="center">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button>{currentPage}</Button>
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= data.length}
            >
              Next
            </Button>
          </Flex>

        </Box>
      ) : (
        <Box textAlign='center'>
        <Box textAlign='center'>
            <Spinner size='xl' color='teal.500' thickness='4px' />
        </Box>
        </Box>
      )}
    </Box>
   

    </Box>
    <Spacer />
     <Box border='2px' borderColor='gray.400' w="18%" h="100vh" bgColor="#3f5efb" className='sidebar'>
      </Box>
    </Flex>
    <p>
    </p> 
    </div>
  )
}

export default History