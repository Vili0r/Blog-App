import React from 'react';
import Image from 'next/image';
import Avatar from '../public/avatar.jpeg'

const Author = ({ author }) => {
    
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
        <div className="absolute left-0 right-0 -top-14">
            <Image
                unoptimized
                alt={author.author.name}
                height="100px"
                width="100px"
                className="align-middle rounded-full"
                src={Avatar}
            />
        </div>
        <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.author.name}</h3>
        <p className="text-white text-ls">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus itaque qui nobis praesentium quam reiciendis, quasi, numquam repellendus veritatis molestiae saepe alias, sit voluptatibus eveniet unde earum aliquam. Accusantium, deleniti.</p>
    </div>
  )
}

export default Author