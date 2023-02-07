// import React, { useState } from "react";
// import { useRouter } from "next/router";

// import Title_section from "../Title_section";

// import Input_text from "@/modules/form/Input_text";
// import { insert_photo } from "@/pages/manage/insert_photo";
// import Input_file from "@/modules/form/Input_file";
// import Input_number from "@/modules/form/Input_number";

// import en from "../../../locales/en";
// import fr from "../../../locales/fr";

// interface FormData {
//   id: string;
//   name: string;
//   email: string;
//   phone: number;
//   language: string;
//   position: string;
//   subject: string;
//   message: string;
//   file_url: string;
// }

// function Apply_to_join_us() {

//   const router = useRouter();
//   const { locale } = router;
//   const translation = locale === "fr" ? fr : en;
//   const refresh_data = () => {
//     router.replace(router.asPath);
//   };

//   const emtpy_form = {
//     id: "",
//     name: "",
//     email: "",
//     phone: "",
//     language: "",
//     position: "",
//     subject: "",
//     message: "",
//     file_url: "",
//   };

//   const [form, setForm] = useState<FormData>(emtpy_form);
//   // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

//   async function create(data: FormData) {
//     if (data.id) {

//       try {
//         await fetch(`/api/apply_to_join_us/create`, {
//           body: JSON.stringify(data),
//           headers: {
//             "Content-Type": "application/json",
//           },
//           method: "POST",
//         })
//           .then(() => {
//             setForm(emtpy_form);
//             console.log("then we create");
//           })
//           .catch((e) => console.log(e));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
//   const submit_fn = async (event) => {
//     await insert_photo(event, "team_member");

//     form.photo_url = photo.secure_url;

//     console.log("form.photo_url", form.photo_url);

//     try {
//       // DOMPurify.sanitize(data)
//       create(form);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className="mt-8">
//         <Title_section title="Our team" />
//       </div>

//       <div className="flex flex-col justify-center items-center text-center p-4 text-base bg-red-200">
//         <span className="text-bl">
//           we hire individuals who work in our fields of experience
//         </span>

//           <div className="flex">
//             <div className="flex flex-1 w-1/2 justify-center items-center mx-auto bg-gray-50">
//               <form
//                 method="post"
//                 onSubmit={submit_fn}
//                 className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch "
//               >
//                 <Input_text
//                   label="tag_fr"
//                   label_display="Catégorie"
//                   placeholder="Veuillez entrer la catégorie"
//                   value={form.name}
//                   on_change={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//                 <Input_text
//                   label="tag"
//                   label_display="Category"
//                   placeholder="Enter the category please"
//                   value={form.email}
//                   on_change={(e) => setForm({ ...form, email: e.target.value })}
//                 />

//                 <Input_number
//                   label="title_fr"
//                   label_display="Le titre du projet"
//                   placeholder="Veuiller entre le titre du projet"
//                   value={form.phone}
//                   on_change={(e) => setForm({ ...form, phone: e.target.value })}
//                 />
//                 <Input_text
//                   label="title"
//                   label_display="Title"
//                   placeholder="The project title please"
//                   value={form.position}
//                   on_change={(e) =>
//                     setForm({ ...form, position: e.target.value })
//                   }
//                 />
//                 <Input_text
//                   label="excerpt_fr"
//                   label_display="Description du projet"
//                   placeholder="veuillez entrer la description du projet"
//                   value={form.subject}
//                   on_change={(e) =>
//                     setForm({ ...form, subject: e.target.value })
//                   }
//                 />
//                 <Input_text
//                   label="excerpt"
//                   label_display="excerpt"
//                   placeholder="Enter the project description"
//                   value={form.message}
//                   on_change={(e) =>
//                     setForm({ ...form, message: e.target.value })
//                   }
//                 />

//                 <Input_file name="file" label_display="cv pdf" />
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white rounded p-1"
//                 >
//                   {locale === "en" ? `Save` : `Enregistrer`}
//                 </button>
//               </form>
//               <button
//                 className="text-slate-50 ml-4 px-4 py-3  rounded-lg bg-blue-500 hover:scale-110 transition duration-150 ease-out hover:ease-in"

//               >
//                 Join our team
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// export default Apply_to_join_us;
