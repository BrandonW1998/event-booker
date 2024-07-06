"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

export default function NewEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!eventName) {
        toast.error("Event name is required");
      } else if (!eventDate) {
        toast.error("Event date is required");
      } else if (!eventDescription) {
        toast.error("Event description is required");
      } else if (!eventLocation) {
        toast.error("Event location is required");
      } else if (!eventOrganizer) {
        toast.error("Event organizer is required");
      } else {
        const newEvent = {
          id: uuidv4(),
          name: eventName,
          date: eventDate,
          description: eventDescription,
          location: eventLocation,
          organizer: eventOrganizer,
        };

        const events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));

        setEventName("");
        setEventDate("");
        setEventDescription("");
        setEventLocation("");
        setEventOrganizer("");

        toast.success("New event created");
      }
    } catch (error) {
      toast.error("An error occured in a component");
    }
  }

  return (
    <>
      <ToastContainer theme="colored" autoClose={2000} />
      <section className="flex items-center justify-center py-10 px-6 lg:py-5">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="event-name">Event Name</label>
              <input
                type="text"
                name="event-name"
                id="event-name"
                required
                placeholder="Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="event-date">Event Date</label>
              <input
                // !!! TODO Change back to date !!!
                type="text"
                name="event-date"
                id="event-date"
                required
                placeholder="Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="event-description">Event Description</label>
            <textarea
              name="event-description"
              id="event-description"
              cols="30"
              rows="6"
              required
              placeholder="Give a brief description about the event"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="event-location">Event Location</label>
              <input
                type="text"
                name="event-location"
                id="event-location"
                required
                placeholder="Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="event-organizer">Event Organizer</label>
              <input
                type="text"
                name="event-organizer"
                id="event-organizer"
                required
                placeholder="Primary Organizer"
                value={eventOrganizer}
                onChange={(e) => setEventOrganizer(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-white py-3 px-6 rounded-lg w-full outline-none text-neutral-900 font-semibold hover:animate-pulse"
          >
            Create new event
          </button>
        </form>
      </section>
    </>
  );
}
