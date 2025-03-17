import React from "react";
import Classes from "./Classes";

export default function AboutMe() {
  return (
    <div>
      <section className="bottomHalf">
        <strong>
          <h4 className="aboutMeTxt">
            Fitness has always been a significant part of my life. I grew up
            running around the neighborhood, riding bikes, and playing outside.
            My sister and I would often choreograph dance routines and perform
            them for our parents-I'm sure they eventually got a bit tired of the
            shows! In my late teens, I began coaching gymnastics and later dance
            at a local gym, a role I held for over a decade. I also coached the
            high school dance team for several years. Throughout all of this, I
            was constantly at the gym or enjoying outdoor activities like
            walking and running. Now, at 47, l'm still able to run a couple of
            miles and get in a great boot camp or dance workout 4-5 times a
            week. I truly believe that staying active can transform your life
            it's essential for both physical and mental health. I'm grateful for
            the opportunity to help others achieve their fitness goals, and l'd
            love to see you in class!
          </h4>
        </strong>
      </section>

      {/* image array? or collection of immages  */}
      {/* <img href=""></img> */}
      <div className="images">
        <img
          className="one"
          src="/Mind map - Page 1.png"
          alt="A description of the image"
          width="1400"
        ></img>
      </div>
    </div>
  );
}
