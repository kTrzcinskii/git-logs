import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Props {
  commitId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export const RepositoryLogCard: React.FC<Props> = ({
  authorEmail,
  authorName,
  commitId,
  content,
  createdAt,
}) => {
  const date = new Date(createdAt);

  return (
    <Card>
      <CardHeader>
        <Heading size="sm">{commitId}</Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize="md" fontWeight="medium">
          {content}
        </Text>
      </CardBody>
      <CardFooter>
        <VStack alignItems="start">
          <Text as="i">
            By {authorName} ({authorEmail})
          </Text>
          <Text as="i">
            At {date.toLocaleTimeString()} - {date.toLocaleDateString()}
          </Text>
        </VStack>
      </CardFooter>
    </Card>
  );
};
