"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { StatCard } from "@/components/ui/stat-card";
import { SearchInput } from "@/components/ui/search-input";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { ViewButton } from "@/components/ui/view-button";
import { NewDisputeModal } from "@/components/new-dispute-modal";
import { ChevronDown, Plus } from "lucide-react";
import { getAllDisputes } from "@/services/disputes-service";
import type { Dispute } from "@/types/disputes";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DisputesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("This Month");

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const data = await getAllDisputes();
      setDisputes(data);
    } catch (error) {
      console.error("Failed to fetch disputes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleDisputeSuccess = () => {
    setIsModalOpen(false);
    fetchDisputes();
  };

  const filteredDisputes = disputes.filter((dispute) => {
    if (statusFilter !== "All" && dispute.status !== statusFilter) {
      return false;
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        dispute.id.toLowerCase().includes(searchLower) ||
        dispute.bookingId.toLowerCase().includes(searchLower) ||
        dispute.customerId.toLowerCase().includes(searchLower) ||
        dispute.customerName.toLowerCase().includes(searchLower) ||
        dispute.dressId.toLowerCase().includes(searchLower) ||
        dispute.reason.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const totalDisputes = disputes.length;
  const pendingDisputes = disputes.filter((d) => d.status === "Pending").length;
  const resolvedDisputes = disputes.filter((d) => d.status === "Resolved").length;
  const resolutionRate = totalDisputes
    ? Math.round((resolvedDisputes / totalDisputes) * 100)
    : 0;

  const resultsPerPage = 10;
  const totalPages = Math.ceil(filteredDisputes.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentDisputes = filteredDisputes.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="p-[80px]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[32px] font-normal uppercase">Disputes</h2>
          <div className="flex space-x-[30px]">
            <div className="flex bg-[#8c1c3a] pr-[21px]  rounded-lg items-center  justify-center text-white text-[16px] font-normal  border-[#8c1c3a]">
              <SelectDropdown
                label="Time Filter"
                value={timeFilter}
                onChange={setTimeFilter}
                options={[
                  "Today",
                  "This Week",
                  "This Month",
                  "This Year",
                  "All Time",
                ]}
                className="bg-[#8c1c3a] pl-[16px] pr-[100px] border-[#8c1c3a]"
              />
              <ChevronDown />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md flex items-center"
            >
              Submit New Dispute <Plus className="mr-2 h-4 w-4 ml-[30px]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mb-10">
          <StatCard
            title="Total Disputes"
            value={totalDisputes.toString()}
            className="bg-[#8c1c3a]  rounded-xl text-[white] shadow-[0px_4px_10px_0px_#0000001A]"
          />
          <StatCard
            title="Resolution Rate"
            value={`${resolutionRate}%`}
            className=" rounded-xl shadow-[0px_4px_10px_0px_#0000001A]"
          />
          <StatCard
            className="text-[black] shadow-[0px_4px_10px_0px_#0000001A] rounded-xl"
            title="Pending Disputes"
            value={pendingDisputes.toString()}
          />
        </div>

        <div className="bg-white py-[25px] px-[30px] rounded-lg mb-8 shadow-[0px_4px_10px_0px_#0000001A]">
          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="Search ......"
              className="max-w-md py-[15px] border-[#E6E6E6]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center justify-center border-[#E6E6E6] border rounded-lg pr-[10px]">
              <SelectDropdown
                label="Status Filter"
                value={statusFilter}
                className="border-none text-[16px] font-normal text-[#595959] pr-[100px] "
                onChange={setStatusFilter}
                options={[
                  "All",
                  "Pending",
                  "In Progress",
                  "Resolved",
                  "Escalated",
                  "Closed",
                ]}
              />
              <ChevronDown />
            </div>
          </div>
        </div>

        <div className="bg-white py-4 px-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <Table className="[&>tbody>tr]:border-0 [&>thead>tr]:border-0">
              <TableHeader>
                <TableRow  className="border-0">
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Dress ID</TableHead>
                  <TableHead>Dispute Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Loading disputes...
                    </TableCell>
                  </TableRow>
                ) : currentDisputes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No disputes found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentDisputes.map((dispute) => (
                    <TableRow key={dispute.id} className=" text-[#000000] text-[18px]">
                      <TableCell className="py-[34px] ">{dispute.dateSubmitted}</TableCell>
                      <TableCell className="py-[34px] ">{dispute.bookingId}</TableCell>
                      <TableCell className="py-[34px] ">{dispute.customerId}</TableCell>
                      <TableCell className="py-[34px] ">{dispute.dressId}</TableCell>
                      <TableCell className="py-[34px] ">{dispute.reason}</TableCell>
                      <TableCell className="py-[34px] ">
                        <Badge
                          variant="outline"
                          className={
                            dispute.status === "Pending"
                              ? "bg-yellow-100 text-[#6F6648]"
                              : dispute.status === "In Progress"
                              ? "bg-blue-100 text-[#2D26FD]"
                              : dispute.status === "Escalated"
                              ? "bg-red-100 text-red-800"
                              : dispute.status === "Closed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-[#B3E9C9] text-[black]"
                          }
                        >
                          {dispute.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/disputes/${dispute.id}`}>
                          <Button variant="outline" size="sm" className="bg-[#891D33] text-white rounded-xl">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          {filteredDisputes.length > resultsPerPage && (
            <div className="flex items-center justify-between pt-6 px-2">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{Math.min(endIndex, filteredDisputes.length)}</span> of{" "}
                <span className="font-medium">{filteredDisputes.length}</span> results
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isActive = page === currentPage;
                  return (
                    <Button
                      key={page}
                      // variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={isActive ? "bg-[#f7d6db] text-[#8c1c3a]" : ""}
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <NewDisputeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleDisputeSuccess}
      />
    </Layout>
  );
}
