import { Box, Container, Flex, Heading, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error fetching city data:", error));
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Flex as="nav" bg="teal.500" p={4} justifyContent="space-between" alignItems="center">
        <Heading color="white" fontSize="xl">NomadRank</Heading>
      </Flex>
      <VStack spacing={8} align="stretch" backgroundImage="url('/images/tropical-beach.jpg')" backgroundSize="cover" p={8}>
        <Box p={8} bg="whiteAlpha.800" borderRadius="lg">
          <Heading as="h1" size="2xl" textAlign="center">Discover Your Best Place to Work Remotely</Heading>
          <Text fontSize="lg" mt={4} textAlign="center">Explore cities around the world based on your preferences.</Text>
        </Box>
        <Box>
          <Input placeholder="Search cities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Box>
      </VStack>
      <Container maxW="container.xl" p={4}>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {filteredCities.map(city => (
            <Box key={city.id} p={4} bg="white" boxShadow="md" borderRadius="lg">
              <Text fontWeight="bold" fontSize="lg">{city.name}</Text>
              <Text fontSize="md">{city.country}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Index;