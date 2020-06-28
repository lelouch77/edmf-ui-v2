import React, { ReactNode } from 'react';

export default function LinkRenderer(props: Props) { 
    function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        props.onClick(props.data);
    }

   return (
     <a href="#" onClick={onClick}>{props.value}</a>
  );
}