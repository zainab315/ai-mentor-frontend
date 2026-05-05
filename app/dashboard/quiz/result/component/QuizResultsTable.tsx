// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { categorizeMarks } from "@/lib/methods"; 
// import { useUser } from "@clerk/nextjs";
// import { Get_All_Quiz } from "@/lib/query";
// import { useQuery } from "@apollo/client";
// import { useEffect } from "react";

// interface QuizResult {
//   getAllQuiz: any;
//   subject: string;
//   marks: string;
//   level: string;
//   difficulty: string;
//   createdAt: Date;
// }





// export function QuizResultsTable() {

//   const {user} = useUser(); 
//   const userID = user?.id; 
//   useEffect(()=> {  
//     if(userID){
//        refetch().then((res)=>console.log(res)); 
//     }
//   },[user])

//   console.log('userID',userID)
//   const { data, loading, error, refetch } = useQuery<QuizResult>(Get_All_Quiz(), {
//     skip:!userID,
//     variables: { userId: userID ,page: "1", limit: "10"} 
//   }); 
  
  
  
//   return (
//     <div className="backdrop-blur-sm bg-card/80 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)] border border-border/50">
//       <h2 className="text-2xl font-bold mb-6 text-primary">Quiz Results</h2>
//       <div className="relative overflow-hidden rounded-lg border border-border/50">
//         <Table>
//           <TableHeader className="bg-muted/50">
//             <TableRow>
//               <TableHead className="w-20 text-primary font-semibold">ID</TableHead>
//               <TableHead className="text-primary font-semibold">Subject Name</TableHead>
//               {/* <TableHead className="text-primary font-semibold">Difficulty</TableHead>
//               <TableHead className="text-primary font-semibold">Level</TableHead> */}
//               <TableHead className="text-primary font-semibold">Date</TableHead>
//               <TableHead className="text-right text-primary font-semibold">Marks</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data && data.getAllQuiz.data.map((result:any,index:number) => (
//               <TableRow
//                 key={result.id}
//                 className="hover:bg-muted/50 transition-colors duration-200"
//               >
//                 <TableCell className="font-medium">{index+1}</TableCell>
//                 <TableCell>{result.subject}</TableCell>
//                 {/* <TableCell>{result.difficulty}</TableCell>
//                 <TableCell>{result.level}</TableCell> */}
//                 <TableCell>{result.createdAt.slice(0,10)}</TableCell>
//                 <TableCell className="text-right">
//                   <span className={`font-semibold ${
//                     categorizeMarks(result.marks) === "High" ? "text-green-500" :
//                     categorizeMarks(result.marks) === "Medium" ? "text-yellow-500" :
//                     "text-red-500"
//                   }`}>
//                     {result.marks}
//                   </span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }


"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { categorizeMarks } from "@/lib/methods"; 
import { useUser } from "@clerk/nextjs";
import { Get_All_Quiz } from "@/lib/query";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

interface QuizResult {
  getAllQuiz: {
    data: Array<{
      id: string;
      subject: string;
      marks: string;
      level: string;
      difficulty: string;
      createdAt: string;
      subBranch: string;
    }>;
    totalPages: number;
    totalQuizCount: number;
    currentPage: number;
    currentPagePerLimit: number;
  };
}

export function QuizResultsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [goToPage, setGoToPage] = useState("");
  const { user } = useUser(); 
  const userID = user?.id; 

  const { data, loading, error, refetch } = useQuery<QuizResult>(Get_All_Quiz(), {
    skip: !userID,
    variables: { 
      userId: userID,
      page: currentPage.toString(), 
      limit: pageSize.toString() 
    } 
  }); 
  
  useEffect(() => {  
    if (userID) {
      refetch();
    }
  }, [userID, currentPage, pageSize, refetch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    document.getElementById('quiz-results-table')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= (data?.getAllQuiz.totalPages || 1)) {
      handlePageChange(pageNum);
    }
    setGoToPage("");
  };

  const totalPages = data?.getAllQuiz.totalPages || 1;
  const totalItems = data?.getAllQuiz.totalQuizCount || 0;
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of page range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Calculate the range of items being displayed
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div id="quiz-results-table" className="backdrop-blur-sm bg-card/80 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)] border border-border/50">
      <h2 className="text-2xl font-bold mb-6 text-primary">Quiz Results</h2>
      <div className="relative overflow-hidden rounded-lg border border-border/50">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-20 text-primary font-semibold">ID</TableHead>
              <TableHead className="text-primary font-semibold">Subject Name</TableHead>
              <TableHead className="text-primary font-semibold">Sub Branch</TableHead>
              <TableHead className="text-primary font-semibold">Date</TableHead>
              <TableHead className="text-right text-primary font-semibold">Marks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-red-500">
                  Error loading quiz results
                </TableCell>
              </TableRow>
            ) : data && data.getAllQuiz.data.length > 0 ? (
              data.getAllQuiz.data.map((result, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/50 transition-colors duration-200"
                >
                  <TableCell className="font-medium">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell>{result.subBranch}</TableCell>
                  <TableCell>{new Date(result.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      categorizeMarks(result.marks) === "High" ? "text-green-500" :
                      categorizeMarks(result.marks) === "Medium" ? "text-yellow-500" :
                      "text-red-500"
                    }`}>
                      {result.marks}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No quiz results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {data && data.getAllQuiz.totalQuizCount > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-[80px] h-9">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Showing {startItem} to {endItem} of {totalItems} results
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Go to page:</span>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={goToPage}
                  onChange={(e) => setGoToPage(e.target.value)}
                  className="w-16 h-9 mr-2"
                  onKeyDown={(e) => e.key === 'Enter' && handleGoToPage()}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGoToPage}
                  disabled={!goToPage}
                >
                  Go
                </Button>
              </div>
            </div>
          </div>
          
          <Pagination className="mx-auto">
            <PaginationContent className="flex flex-wrap justify-center gap-1">
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                  aria-label="First page"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
              
              {getPageNumbers().map((page, i) => (
                typeof page === 'number' ? (
                  <PaginationItem key={i}>
                    <Button
                      variant={page === currentPage ? "default" : "outline"}
                      size="icon"
                      className={`h-9 w-9 ${page === currentPage ? 'pointer-events-none' : 'cursor-pointer'}`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Page ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={i}>
                    <div className="flex items-center justify-center h-9 w-9">
                      <PaginationEllipsis />
                    </div>
                  </PaginationItem>
                )
              ))}
              
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                  aria-label="Last page"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
