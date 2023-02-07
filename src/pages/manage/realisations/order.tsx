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

import { Inter } from "@next/font/google";
import { prisma } from "../../../../lib/prisma";

import Sidebar from "../components/Sidebar";

import { useRouter } from "next/router";
import en from "../../../locales/en";
import fr from "../../../locales/fr";

import Title_section from "@/modules/sections/Title_section";

const inter = Inter({ subsets: ["latin"] });

interface I_realisations {
  realisations: {
    id: string;
    title: string;
    title_fr: string;
    photo_url: string;
  }[];
}

export default function Realisations_list_order({
  realisations,
}: I_realisations) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  const [characters, update_characters] = useState(realisations);

  interface I_on_drag_end_fn {
    result: object;
  }
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
      await fetch(`/api/realisation/update_order`, {
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
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex min-h-screen py-8  mt-[60px]">
        <div className="w-2/6 p-6 bg-blue-100">
          <Sidebar />
        </div>
        <div className="w-1/2  mx-auto bg-gray-50">
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
                            className="flex items-center border-2 py-2 px-4 my-2 border-blue-800 bg-slate-300 text-bl text-sm font-bold rounded-lg"
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
                                  className="object-cover object-center h-full w-full"
                                />
                              </div>
                              <div className="ml-4">
                                {locale === "fr" &&
                                  character.title_fr.length > 5 &&
                                  character.title_fr}

                                {locale === "en" &&
                                  character.title.length > 5 &&
                                  character.title}
                              </div>
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
              className="bg-blue-400 py-2 px-3 text-white rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const realisations = await prisma.realisation.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      title: true,
      title_fr: true,
      photo_url: true,
    },
    orderBy: { order: "asc" },
  });

  console.log("realisations", realisations);

  resetServerContext();

  return {
    props: {
      realisations,
    },
  };
};
