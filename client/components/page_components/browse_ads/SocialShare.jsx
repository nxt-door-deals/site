import React from "react";
import {
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
  TelegramShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";

const SocialShare = (props) => {
  return (
    <div className="flex gap-2 mb-3">
      <WhatsappShareButton
        url={typeof window !== "undefined" && window.location.href}
        title={`Check out this ad from ${props.apartmentName} - ${props.title} (${props.condition})`}
        separator=" - "
      >
        <WhatsappIcon size={32} borderRadius={10} />
      </WhatsappShareButton>
      <TelegramShareButton
        url={typeof window !== "undefined" && window.location.href}
        title={`Check out this ad from ${props.apartmentName} - ${props.title} (${props.condition})`}
      >
        <TelegramIcon size={32} borderRadius={10} />
      </TelegramShareButton>
      <EmailShareButton
        url={typeof window !== "undefined" && window.location.href}
        subject={`Check out this ad from ${props.apartmentName} - ${props.title} (${props.condition})`}
        body="Link"
        separator=" - "
      >
        <EmailIcon size={32} borderRadius={10} />
      </EmailShareButton>
    </div>
  );
};

export default SocialShare;
