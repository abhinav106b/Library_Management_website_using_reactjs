import React from 'react'
import ReactPaginate from 'react-paginate'

const Userdisplay=({totalpost,paginate})=>{
    const pageNumbers=[]
    for(let i=1;i<=Math.ceil(totalpost/30);i++){
        pageNumbers.push(i);
    }
    return (
        
          <div>
            <nav className="mt-4">
            <ReactPaginate className="pagination" breakLabel="..."
                nextLabel={<span className="page-ht fa fa-chevron-circle-right"></span>}
                onPageChange={paginate}
                pageRangeDisplayed={5}
                pageCount={pageNumbers.length}
                previousLabel={<span className="page-ht fa fa-chevron-circle-left"></span>}
                renderOnZeroPageCount={null}
            />
            </nav>
          </div>
      );
    
}

export default Userdisplay;