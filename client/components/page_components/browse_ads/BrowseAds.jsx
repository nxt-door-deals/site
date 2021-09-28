import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

import { toast } from "react-toastify";

// Component imports
import NbhAdsCard from "./NbhAdsCard";
import SearchNbhAds from "../../forms/SearchNbhAds";

const BrowseAds = (props) => {
  const [notification, setNotification] = useState(false);
  const authContext = useContext(AuthContext);
  const { user, loadSellerChats, loadBuyerChats, sellerChats, buyerChats } =
    authContext;

  // Chat notification toast
  const chatNotificationToast = () =>
    toast("You have new chat messages. Visit your account page.", {
      draggablePercent: 60,
      position: "top-center",
    });

  useEffect(() => {
    if (user) {
      // Notify users if there are new chats
      loadBuyerChats(user && user.id);
      loadSellerChats(user && user.id);
    }
  }, [user]);

  useEffect(() => {
    if (sellerChats && sellerChats && !props.chatNotification.current) {
      // Check is someone has DM'ed the seller
      sellerChats.some((chat) => {
        if (chat.new_chats && chat.last_sender !== user.id) {
          props.chatNotification.current = true;
          setNotification(true);
        }
      });
    }
  }, [sellerChats]);

  useEffect(() => {
    if (buyerChats && buyerChats && !props.chatNotification.current) {
      buyerChats.some((chat) => {
        if (chat.new_chats && chat.last_sender !== user.id) {
          props.chatNotification.current = true;
          setNotification(true);
        }
      });
    }
  }, [buyerChats]);

  useEffect(() => {
    if (notification && !props.notificationDisplayed.current) {
      chatNotificationToast();
      setTimeout(() => (props.notificationDisplayed.current = true), 1000);
      setNotification(false);
    }
  }, [notification]);

  return (
    <div className="mt-8 mb-20">
      <SearchNbhAds nbhId={props.nbhId} />
      <NbhAdsCard nbhId={props.nbhId} />
    </div>
  );
};

export default BrowseAds;
