"use client";
import { FormAction } from "@/utils/enums";
import { Menu } from "@prisma/client";
import React from "react";
import CreateMenu from "./CreateMenu";
import useAppSlice from "@/store/hook/useAppSlice";
import EditMenu from "./EditMenu";

const MenuForm = () => {
  const { state } = useAppSlice();

  const { formAction } = state.app;

  if (formAction === FormAction.create) return <CreateMenu />;
  if (formAction === FormAction.edit) return <EditMenu />;

  return <div>null</div>;
};

export default MenuForm;
