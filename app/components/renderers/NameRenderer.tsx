import React, { ReactNode } from 'react';

export default function NameRenderer(props: Props) { 
  const profileImage = props.data.profile_image_url_https || "https://abs.twimg.com/sticky/default_profile_images/default_profile_x96.png"
  return (
      <span><img width="32px" height="32px" style={{display:"inline",borderRadius:"50%",paddingBottom:"3px"}} src={profileImage}/> {props.value}</span>
  );
}