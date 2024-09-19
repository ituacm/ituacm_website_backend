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

import { EventsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import AddEvent from "../../components/Events/AddEvent"

const eventsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/events")({
  component: Events,
  validateSearch: (search) => eventsSearchSchema.parse(search),
})

const PER_PAGE = 5

function getEventsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      EventsService.readEvents({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["events", { page }],
  }
}

function EventsTable() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev: any) => ({ ...prev, page }) })

  const {
    data: events,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getEventsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && events?.events.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getEventsQueryOptions({ page: page + 1 }))
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
              <Th>Location</Th>
              <Th>Start</Th>
              <Th>End</Th>
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
              {events?.events.map((event) => (
                <Tr key={event.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{event.id}</Td>
                  <Td isTruncated maxWidth="150px">
                    {event.title}
                  </Td>
                  <Td
                    color={!event.description ? "ui.dim" : "inherit"}
                    isTruncated
                    maxWidth="150px"
                  >
                    {event.description || "N/A"}
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {event.content || "N/A"}
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {event.image ? <img src={event.image} alt="Event" width={50} /> : "N/A"}
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {event.location || "N/A"}
                  </Td>
                  <Td>{new Date(event.start).toLocaleString()}</Td>
                  <Td>{new Date(event.end).toLocaleString()}</Td>
                  <Td>{event.is_visible ? "Yes" : "No"}</Td>
                  <Td>
                    <ActionsMenu type={"Event"} value={event} />
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

function Events() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Events Management
      </Heading>

      <Navbar type={"Event"} addModalAs={AddEvent} />
      <EventsTable />
    </Container>
  )
}
