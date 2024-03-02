"use server";

import { createTransport } from "nodemailer";
import { RescueTeam } from "@/datas/rescueTeams";

const transport = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export interface ContactFromState {
  message: string;
  link: string;
  fieldValues: {
    sender_name: string;
    sender_email: string;
    sender_message: string;
  };
}

export async function sendQuickMail({
  checkedItems,
  latitude,
  longitude,
  address,
}: {
  checkedItems: RescueTeam[];
  latitude: string;
  longitude: string;
  address: string;
}) {
  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const msgToSend = `Accident at ${address}. <br> Map Link - ${googleMapLink}`;
  const mailList = checkedItems
    .filter((item: RescueTeam) => item.isChecked)
    .map((item: RescueTeam) => ({
      name: item.name,
      address: item.email,
    }));
  const mailResponse = await transport.sendMail({
    from: process.env.EMAIL,
    to: mailList as any,
    subject: "🚨 Accident Alert",
    text: msgToSend,
  });
  return mailResponse;
}
