import React, { useState } from "react";
import CreateVideoPostPresenter from "./CreateVideoPostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD } from "./CreateVideoPostQueries";
import axios from "axios";
import { toast } from "react-toastify";


export default ({cat, pid}) => {
  const [action, setAction] = useState("CreatePost");
  const [create, setCreate] = useState(false);
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const caption = useInput("");
  const photo = useInput("");
  const path = "";
  var limit = 100;
  var cur = 0;
  var id = "";
  const meQuery = useQuery(ME);
  var data = "",
    loading = "";
  if (meQuery.data.me) {
    id = meQuery.data.me.id;

    const FOLLOWQuery = useQuery(FOLLOW, {
      variables: {
        id,
        limit,
        cur,
      },
    });
    data = FOLLOWQuery.data;
    loading = FOLLOWQuery.loading;
  }

  const uploadMutation = useMutation(UPLOAD, {
    variables: {
      caption: "caption.value #안녕 #하세요",
      category: "image",
      rel_challengers: "",
      pre_challengers: "",
      next_challengers: "",
      tag_challengers: "",
      files: path,
      postId: "",
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "CreatePost") {
      if (create) {
        let formData = new FormData();
        let photoFile = document.getElementById("photo");

        formData.append("file", photoFile.files[0]);
        try {
          const {
            data: { path },
          } = await axios.post("http://localhost:4000/api/upload", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });

          const {
            data: { uploadChallenge },
          } = await uploadMutation();
          if (uploadChallenge.id) {
            window.location.href = "/";
          }
        } catch (e) {
          toast.error("Cant upload", "Try later");
        } finally {
        }
      }
    } else if (action === "relChallenger") {
    } else if (action === "tagChallenger") {
    }
  };
  return (
    <CreateVideoPostPresenter
      setAction={setAction}
      action={action}
      setCreate={setCreate}
      create={create}
      photo={photo}
      onSubmit={onSubmit}
      relChallenger={relChallenger}
      tagChallenger={tagChallenger}
      setRelChallenger={setRelChallenger}
      setTagChallenger={setTagChallenger}
      loading={loading}
      data={data}
      id={id}
      cat={cat}
      pid={pid}
    />
  );
};