import React from 'react'

const Pagination = ({ pagination, pageChanged }) => {
    
    const changePage =(url) => {
        const fullUrl = new URL(url);
        const page = fullUrl.searchParams.get('page');

        pageChanged(page);
    }
    
    return (
        <div>
            <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 leading-5">
                            Showing
                            <span>
                                <span className="font-medium"> {pagination.from} </span>
                                to
                                <span className="font-medium"> {pagination.to} </span>
                            </span>
                            of
                            <span className="font-medium"> {pagination.total} </span>
                            results
                        </p>
                    </div>
                    <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                            {pagination.links?.map((link, index) => {
                                return (
                                    <button key={index} onClick={() => changePage(link.url)} dangerouslySetInnerHTML={{ __html: link.label }} className={link.label == pagination.current_page ? "bg-gray-200 hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white" : "hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline hover:bg-blue-500 hover:text-white"} />
                                )
                            })}
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Pagination;