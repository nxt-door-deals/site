import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "../../utils/cookieInit";
import axios from "axios";
import { toast } from "react-toastify";

import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import ChatHeadLayout from "../../components/layout/ChatHeadLayout";
import ActiveChat from "../../components/utils/ActiveChat";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import LetsVerifyYourEmail from "../../components/utils/LetsVerifyYourEmail";

const Chat = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);

  const {
    loadUser,
    isAuthenticated,
    user,
    getUserFromId,
    altUser,
  } = authContext;

  if (!cookie.get("nddToken")) {
    if (!cookie.get("__redirChatCookie")) {
      cookie.set(
        "__redirChatCookie",
        {
          _adId: props.adId,
          _slrId: props.sellerId,
          _byrId: props.buyerId,
        },
        {
          path: "/",
        }
      );
    }

    // Save the url (/chat) for redirect after login
    props.pathHistory.current = pathname;
    if (process.browser) {
      router.push("/login");
    }

    return <div></div>;
  }

  // Email not verified toast
  const emailNotVerifiedToast = () =>
    toast("You will need to verify your email to start a conversation", {
      draggablePercent: 60,
      position: "top-center",
    });

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (cookie.get("__redirChatCookie")) {
        cookie.remove("__redirChatCookie");
      }

      let clientIds = [props.sellerId, props.buyerId];

      // If current user tries viewing someone else's chat, redirect them to 404
      // If not, create the cookie
      clientIds.includes(String(user.id))
        ? cookie.set(
            "__redirChatCookie",
            {
              _adId: props.adId,
              _slrId: props.sellerId,
              _byrId: props.buyerId,
            },
            {
              path: "/",
            }
          )
        : router.push("/404");

      getUserFromId(
        user.id === parseInt(props.buyerId)
          ? parseInt(props.sellerId)
          : parseInt(props.buyerId)
      );
    }
  }, [user]);

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  if (user && !user.email_verified) {
    setTimeout(() => router.push("/account"), 3000);
    return (
      <ChatHeadLayout>
        <LetsVerifyYourEmail message="start a conversation" />
      </ChatHeadLayout>
    );
  }

  return (
    <ChatHeadLayout>
      <div className="font-axiforma h-full">
        <Navbar navStyle={navStylePurple} />
        <div className="w-full bg-chat-mobile-background lg:bg-chat-background bg-cover bg-no-repeat h-80"></div>
        <div className="pt-10 px-5 pb-20 lg:px-64">
          <p className="text-center">
            Your chat with{" "}
            <span className="font-semibold text-purple-500">
              {altUser && altUser.name}
            </span>{" "}
            for the ad,{" "}
            <Link href={`/ads/${props.adId}`}>
              <a
                target="_blank"
                className="font-semibold text-purple-500 hover:underline"
              >
                {props.ad.title}
              </a>
            </Link>
          </p>
          <div className="flex justify-center p-5 lg:p-20 rounded-3xl shadow-lg">
            <div className="w-full">
              {user && altUser && props.chatId && (
                <ActiveChat
                  adId={props.adId && props.adId}
                  sellerId={props.slrId && props.slrId}
                  buyerId={props.byrId && props.byrId}
                  chatId={props.chatId && props.chatId}
                  senderId={user.id}
                  altUser={altUser}
                  ad={props.ad}
                />
              )}
            </div>
          </div>
        </div>

        <Footer footerGradientClass={footerGradientClassPurple} />
      </div>
    </ChatHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  var ids = id && id.split("-");

  if (ids[1] === "") {
    return {
      notFound: true,
    };
  }

  if (!ids.includes("")) {
    // If a wiseguy or gal tries to change the url to have the same id's
    if (ids[1] === ids[2]) {
      return {
        notFound: true,
      };
    }

    // Check if both buyer and seller are legit users
    var user1 = await axios.get(`${process.env.API_URL}/user/${ids[1]}`, {
      headers: {
        "api-key": `${process.env.PROJECT_API_KEY}`,
      },
    });

    var user2 = await axios.get(`${process.env.API_URL}/user/${ids[2]}`, {
      headers: {
        "api-key": `${process.env.PROJECT_API_KEY}`,
      },
    });

    if (!user1.data || !user2.data) {
      return {
        notFound: true,
      };
    }

    // Check if the chat record exisis; if not, create it in the chat and chathistory tables
    var res = await axios.get(
      `${process.env.API_URL}/chat/?ad_id=${ids[0]}&seller_id=${ids[1]}&buyer_id=${ids[2]}`
    );

    var ad = await axios.get(`${process.env.API_URL}/ads/${ids[0]}`);

    if (!res.data) {
      // If a wiseguy or gal tries to interchange the buyer and seller id's in the url
      var additionalCheck = await axios.get(
        `${process.env.API_URL}/chat/?ad_id=${ids[0]}&seller_id=${ids[2]}&buyer_id=${ids[1]}`
      );

      if (additionalCheck.data) {
        return {
          notFound: true,
        };
      }

      // If all is good, insert the records
      const jsonPayload = {
        ad_id: ids[0],
        seller_id: ids[1],
        buyer_id: ids[2],
      };

      try {
        res = await axios.post(
          `${process.env.API_URL}/chat/create`,
          jsonPayload
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return {
    props: {
      adId: ids[0],
      sellerId: ids[1],
      buyerId: !ids.includes("") ? ids[2] : null,
      chatId: !ids.includes("") ? res.data : null,
      ad: !ids.includes("") ? ad.data : null,
    },
  };
};

export default Chat;
