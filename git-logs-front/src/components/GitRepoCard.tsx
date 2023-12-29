import { Card, CardHeader, Heading } from "@chakra-ui/react";

interface Props {
  id: number;
  name: string;
  repositoryUrl: string;
}

export const GitRepoCard: React.FC<Props> = ({ id, name, repositoryUrl }) => {
  return (
    <Card width={300}>
      <CardHeader>
        <Heading size="sm">{name}</Heading>
      </CardHeader>
    </Card>
  );
};
