import React from "react";
import { createPopper } from "@popperjs/core";
import axios from '../lib/axios';
import Swal from 'sweetalert2';

const TableDropdown = ({ articleId, commentId ,getComments, approved }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const deleteComment = async ({articleId, commentId}) => {
    Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete the Comment!',
        cancelButtonColor: '#d33'
    })
    .then((response) => {
        if(response.isConfirmed){
            axios.delete(`/api/articles/${articleId}/comments/${commentId}`)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Comment deleted successfully!',
                    });
                    getComments()
                })
                .catch(error => Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong'
                }))
        }
    })
  }
  
  const approveComment = async ({articleId, commentId}) => {
    axios.put(`/api/articles/${articleId}/comments/${commentId}`)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Comment approved!',
            });
            getComments()
        })
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Something went wrong'
        }))
  }

  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }>
        {/* <Can do="article_update"> */}
        {!approved &&
          <button 
            className={"text-sm py-2 px-4 font-normal flex items-center w-full whitespace-nowrap bg-transparent text-blueGray-700"}
            onClick={() => approveComment({articleId, commentId})}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
              Approve comment
          </button>
        }
        {/* </Can>
        <Can do="article_delete"> */}
          <button
            className={
              "text-sm flex items-center py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={() => deleteComment({articleId, commentId})}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Delete
          </button>
        {/* </Can> */}
      </div>
    </>
  );
};

export default TableDropdown;
