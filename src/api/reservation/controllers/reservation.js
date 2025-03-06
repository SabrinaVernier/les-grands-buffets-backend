"use strict";

/**
 * reservation controller
 */

// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

// @ts-ignore
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::reservation.reservation",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const body = ctx.request.body;
        // console.log("body request>>>", body);

        const date = body.data.date;
        console.log("body date request>>>", date);

        const bookingDateId = body.data.booking_date;
        console.log("body id bookingdate request>>>", bookingDateId);

        const selectedRoom = body.data.room;
        // console.log("body room request>>>", selectedRoom);

        const bookingDate = await strapi.entityService.findOne(
          "api::booking-date.booking-date",
          bookingDateId
        );
        console.log("request findone>>>", bookingDate); // obj du jour choisi

        if (bookingDate[selectedRoom] < body.data.numberOfPlaces) {
          return ctx.badRequest(
            "Not enough places availables, please check the date"
          );
        }

        const { data, meta } = await super.create(ctx);

        const remainingPlaces =
          bookingDate[selectedRoom] - body.data.numberOfPlaces;
        console.log("places restantes>>>", remainingPlaces);

        if (selectedRoom === "rosa") {
          const response = await strapi.entityService.update(
            "api::booking-date.booking-date",
            bookingDate.id,
            {
              data: {
                rosa: remainingPlaces,
              },
            }
          );
          console.log("reponse ap update>>>", response);
        }

        if (selectedRoom === "fontaine") {
          const response = await strapi.entityService.update(
            "api::booking-date.booking-date",
            bookingDate.id,
            {
              data: {
                fontaine: remainingPlaces,
              },
            }
          );
          console.log("reponse ap update>>>", response);
        }

        if (selectedRoom === "nolin") {
          const response = await strapi.entityService.update(
            "api::booking-date.booking-date",
            bookingDate.id,
            {
              data: {
                nolin: remainingPlaces,
              },
            }
          );
          console.log("reponse ap update>>>", response);
        }

        if (selectedRoom === "verrier") {
          const response = await strapi.entityService.update(
            "api::booking-date.booking-date",
            bookingDate.id,
            {
              data: {
                verrier: remainingPlaces,
              },
            }
          );
          console.log("reponse ap update>>>", response);
        }

        if (selectedRoom === "carrigton") {
          const response = await strapi.entityService.update(
            "api::booking-date.booking-date",
            bookingDate.id,
            {
              data: {
                carrigton: remainingPlaces,
              },
            }
          );
          console.log("reponse ap update>>>", response);
        }

        if (selectedRoom === "private") {
          const response = await strapi.entityService.update(
            "api::booking-date.booking-date",
            bookingDate.id,
            {
              data: {
                private: remainingPlaces,
              },
            }
          );
          console.log("reponse ap update>>>", response);
        }

        // reponse normale au client------

        return { data, meta };

        return "bonjour";
      } catch (error) {
        ctx.response.status = 500;
        return { message: error.message };
      }
    },
    async buy(ctx) {
      try {
        const { status } = await stripe.charges.create({
          amount: ctx.request.body.amount * 100,
          currency: "eur",
          description: `Paiement les Grands Buffets pour : ${ctx.request.body.title}`,
          source: ctx.request.body.token,
        });

        return { status: status };

        // console.log("je suis dans le backend");
      } catch (error) {
        ctx.response.status = 500;
        return { message: error.message };
      }
    },
  })
);
