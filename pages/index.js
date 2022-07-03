import Link from "next/link";

import React from 'react'
import ActionButton from "../components/ActionButton";
import Layout from "../components/Layout";
import List from "../components/List";

export default function index() {
  return (
    <Layout title="Trello Clone">
      <div
        className="flex w-full justify-evenly flex-wrap rounded border-dashed border-2 border-gray-300 md:ml-36">
        <List title="Deneme List" tasks={null} listId="123" key="123" index={1} />
        <div>
          <ActionButton />
        </div>
      </div>
    </Layout>
  )
}


