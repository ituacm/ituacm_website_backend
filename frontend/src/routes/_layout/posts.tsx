import {
  Button,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { z } from "zod"

import { PostsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import AddPost from "../../components/Posts/AddPost"

const postsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/posts")({
  component: Posts,
  validateSearch: (search) => postsSearchSchema.parse(search),
})

const PER_PAGE = 5

function getPostsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      PostsService.readPosts({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["posts", { page }],
  }
}

function PostsTable() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: posts,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getPostsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && posts?.posts.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getPostsQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Content</Th>
              <Th>Image</Th>
              <Th>Group</Th>
              <Th>Visible</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {isPending ? (
            <Tbody>
              <Tr>
                {new Array(10).fill(null).map((_, index) => (
                  <Td key={index}>
                    <SkeletonText noOfLines={1} paddingBlock="16px" />
                  </Td>
                ))}
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {posts?.posts.map((post) => (
                <Tr key={post.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{post.id}</Td>
                  <Td isTruncated maxWidth="150px">
                    {post.title}
                  </Td>
                  <Td
                    color={!post.description ? "ui.dim" : "inherit"}
                    isTruncated
                    maxWidth="150px"
                  >
                    {post.description || "N/A"}
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {post.content || "N/A"}
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {post.image ? (
                      <img src={post.image} alt="Image" width={50} />
                    ) : (
                      "N/A"
                    )}
                  </Td>

                  {/* Group */}
                  <Td isTruncated maxWidth="150px">
                    {post.group.name}
                  </Td>

                  <Td>{post.is_visible ? "Yes" : "No"}</Td>
                  <Td>
                    <ActionsMenu type={"Post"} value={post} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Flex
        gap={4}
        alignItems="center"
        mt={4}
        direction="row"
        justifyContent="flex-end"
      >
        <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Flex>
    </>
  )
}

function Posts() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Posts Management
      </Heading>

      <Navbar type={"Post"} addModalAs={AddPost} />
      <PostsTable />
    </Container>
  )
}
