"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return null;
  }
  const isAdmin = user?.publicMetadata.role === "admin";
  return (
    <div>
      <div>
        {user?.fullName}
        {isAdmin ? (
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : (
          <div>forbidden</div>
        )}
      </div>
      {/* <OneFood /> */}
    </div>
  );
}
