import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";

import { BsArrowDownUp } from "react-icons/bs";

import { prisma } from "../../lib/prisma";

import { useRouter } from "next/router";
import { en } from "../locales/en";
import { fr } from "../locales/fr";

import Title_section from "@/modules/sections/Title_section";

export default function Change_list_order(
  elements_to_change_order,
  api_redirection,
  children
) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  const [characters, update_characters] = useState(elements_to_change_order);
  let character;

  const on_drag_end_fn = async (result) => {
    if (!result.destination) return;
    console.log("result", result);
    const items = Array.from(characters);
    const [reordered_item] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered_item);
    update_characters(items);

    console.log("characters we have to enter in our db", characters);
  };

  const submit_fn = async (event) => {
    event.preventDefault();
    console.log("event in submit function", event);

    try {
      console.log("characters in submit form", characters);
      await fetch(`/api/${api_redirection}/update_order`, {
        body: JSON.stringify(characters),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then(() => {
          console.log("then we create order");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative mt-32 bg-slate-100">
      <div className="flex min-h-screen py-8  mt-[60px]">
        <div className="w-1/2 mx-auto bg-gray-50">
          <Title_section title="Order realisations" />

          <DragDropContext onDragEnd={on_drag_end_fn}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {characters.map((character, index) => {
                    return (
                      <Draggable
                        key={character.id}
                        draggableId={character.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="flex items-center px-4 py-2 my-2 text-sm font-bold border-2 border-blue-800 rounded-lg bg-slate-300 text-bl"
                          >
                            <BsArrowDownUp className="font-extrabold" />
                            <div className="flex ml-4">
                              <div className="w-24 h-24 bg-black">
                                <Image
                                  src={character.photo_url}
                                  alt="image"
                                  width={500} // ×
                                  height={500}
                                  //placeholder="blur"
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>
                              {children}
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          <form onSubmit={submit_fn}>
            <button
              type="submit"
              className="px-3 py-2 text-white bg-blue-400 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
