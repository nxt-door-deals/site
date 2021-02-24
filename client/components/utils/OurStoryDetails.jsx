import React from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const OurStoryDetails = () => {
  return (
    <div className="h-full w-full text-brand-gray">
      <div className="text-center px-10 mt-6 lg:px-44 mb-20 bg-transparent">
        <h1 className="component-heading">Our Story</h1>
        <p className="text-lg">
          At{" "}
          <span className="text-brand-purple font-semibold">
            nxtdoordeals.com
          </span>
          , we believe in the power of second chances, community and the
          importance of protecting our environment.
        </p>
      </div>

      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center px-10 py-5 lg:px-44 mb-20 lg:mb-10 bg-purple-50">
        <div className="lg:flex-5">
          <h2 className="text-2xl font-semibold">
            <FontAwesomeIcon icon={faHeart} className="text-red-800" /> your
            pre-loved items
          </h2>
          <p className="pt-5">
            Today, everything, no matter how big or small, is delivered to our
            doorstep. But how many times do we find ourselves boxing up the “old
            stuff” and shipping it to its permanent home in an attic somewhere
            to make way for the new and shiny replacement? Sometimes, we toss it
            in the trash.
          </p>
          <p className="pt-2">
            With a huge chunk of India’s urban population living in large
            apartment communities, there are potentially hundreds of neighbours
            who might be interested in the things we box up or toss away. With
            the average resident being part of a small subset of the hundred or
            so online groups in each community, posting an ad on these platforms
            is more miss than hit in finding that potential buyer. We aim to
            make this buy/sell process simpler by providing a dedicated
            marketplace for your community where you have all the power!
          </p>
        </div>
        <div className="lg:flex-2 px-5">
          <Image
            src="/images/our-story/marketplace.svg"
            height={300}
            width={300}
            alt="marketplace"
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center px-10 py-5 lg:px-44 mb-20 lg:mb-10">
        <div className="lg:flex-2 px-5 pb-2 lg:pb-0">
          <Image
            src="/images/our-story/meet.svg"
            height={300}
            width={300}
            alt="meet"
          />
        </div>
        <div className="lg:flex-5">
          <h2 className="text-2xl font-semibold">Meet thy neighbour</h2>
          <p className="pt-5">
            The easier it becomes to communicate with people, the lesser we do
            it in person! While we provide a platform for residents to shop
            within their community, the transaction is complete only once the
            two parties meet face to face (socially distant, of course!). We
            would like to believe that if all the stars align, you’ve made a
            friend for life!
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center px-10 py-5 lg:px-44  mb-20 bg-purple-50">
        <div className="lg:flex-5">
          <h2 className="text-2xl font-semibold">Save the environment</h2>
          <p className="pt-5">
            One of our core missions is to reduce recyclable waste that might
            end up in a landfill. Whether you are buying or selling a preloved
            item, not only are you helping us in this mission, but you are also
            doing your bit to save mother nature.
          </p>
        </div>
        <div className="lg:flex-2 px-5 pb-2 lg:pb-0">
          <Image
            src="/images/our-story/nature.svg"
            height={350}
            width={350}
            alt="nature"
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center px-10 lg:px-44  lg:mb-0">
        <div className="px-5 lg:flex">
          <Image
            src="/images/our-story/baby-items.svg"
            height={300}
            width={300}
            alt="baby-items"
          />
        </div>
        <div className="lg:flex-4">
          <h2 className="text-2xl font-semibold">How we got here</h2>
          <p className="pt-5">
            About a month before we welcomed our daughter into this world, we
            decided to embark on a shopping spree for her like all nervous
            first-time parents. The more we read about new-born essentials, the
            longer our list grew. Clothes, cribs, strollers, carriers, bath
            supplies and the list went on and on. Then came the shopping part.
            We were always open to the idea of hand-me-downs mostly since babies
            and children outgrow things fast and let’s face it, baby items are
            expensive and sometimes end up not being used. Living in a large
            apartment community, we, therefore, decided to keep our eyes and
            ears open in case any of our neighbours were interested in selling
            their old baby goods. Our search was limited to word of mouth or
            scouring through the subset of online social groups within the
            community. The pandemic (COVID 19 if you are reading this way in the
            future 😉) did not help either.
          </p>
        </div>
      </div>

      <div className="px-10 lg:px-44 pt-5 lg:pt-0">
        <p>
          Growing up, we always inherited the clothes and toys of our elder
          siblings and cousins. Assuming we kept them in one-piece, the next
          generation inherited them from us. Today, most of us work in big
          cities, far away from our families. With the larger volume of the
          urban population living in apartments and apartment complexes, we are
          lucky to have a community of people who whether we’d like to believe
          it or not, is an extended family of sorts. There are always things
          lying around in every home which end up in storage or sometimes end up
          getting tossed out the door. We believe that more people would be
          willing to sell or giveaway such items if they could do so with ease.
        </p>
      </div>

      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center px-10 lg:px-44 pt-5">
        <div className="flex-5">
          <p>
            It all started as shooting the breeze (mostly in frustration!) about
            not having a single dedicated place where we could find “with ease”
            any baby items on sale in our apartment complex. We, therefore,
            decided to do something about it. Since our initial conversations
            were triggered by the aforementioned shopping spree, the first plans
            that we drew up, revolved around creating a platform to easily
            connect parents within an apartment complex. We were sure that most
            parents, irrespective of the age of their kids, faced similar
            challenges. As our conversations progressed, we felt that a devoted
            online marketplace for an apartment complex would be great for
            pre-loved goodies of all kinds. Someone's pre-loved would then
            become someone else’s treasure rather than ending up in an already
            overcrowded landfill somewhere. Thus{" "}
            <span className="text-brand-purple font-semibold">
              nxtdoordeals.com
            </span>{" "}
            was born. The goal was not only to provide a platform to buy and
            sell but also a means where residents could meet each other in
            person to complete the sale without any man in the middle
            involvement.
          </p>
        </div>
        <div className="flex-1 px-5">
          <Image
            src="/images/our-story/idea.svg"
            height={200}
            width={200}
            alt="idea"
          />
        </div>
      </div>

      <div className="px-10 lg:px-44 pt-5">
        <p>
          We did not forget our furry friends either. Being animal lovers
          ourselves, we wanted{" "}
          <span className="text-brand-purple font-semibold">
            nxtdoordeals.com
          </span>{" "}
          to be actively used to sell or giveaway pre-loved pet care goodies.
          While the law of the land does not permit pet sales or adoptions on
          the platform, we highly encourage ads for that doggie bed, chew toy,
          kitty litter tray or the fish bowl that is no longer in use. Why
          should humans have all the fun?
        </p>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center px-10 lg:px-44 pt-5">
        <div className="px-5 pb-5 lg:pb-0">
          <Image
            src="/images/our-story/globe.svg"
            height={150}
            width={150}
            alt="globe"
          />
        </div>
        <div className="lg:flex-2">
          <p>
            Lastly and most importantly, we care about the environment. We
            currently live in a world ravaged by climate change and other severe
            environmental problems. We owe it to mother nature to do whatever
            little we can reduce pollution. Making recycling and reuse second
            nature is a small step in that direction. Every small stride taken
            towards reducing pollution of any kind, ensures a safer and cleaner
            future for our children.
          </p>
        </div>
      </div>

      <div className="px-10 lg:px-44 pt-5 mb-20">
        <p>
          <strong>PS</strong>: If you are wondering about our shopping spree, we
          did luck out in the end since we were able to get most of the things
          on the list from a cousin who lived nearby. Some of those were
          hand-me-down’s from generations past, and we hope to pass them along
          as well.
        </p>
      </div>
    </div>
  );
};

export default OurStoryDetails;
