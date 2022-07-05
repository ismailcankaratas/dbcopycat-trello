import Link from "next/link";

import React, { useEffect } from 'react'
import ActionButton from "../components/ActionButton";
import Layout from "../components/Layout";
import List from "../components/List";
import { useSelector, useDispatch } from 'react-redux'
import { getList } from "../utils/features/listSlice";

export default function index() {
  const { lists } = useSelector(x => x.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lists.length == 0) {
      dispatch(getList());
    }
  }, [lists]);

  return (
    <Layout title="Trello Clone">
      <div
        className="flex z-0 w-full justify-evenly flex-wrap rounded border-dashed border-2 border-gray-300 md:ml-36">
        {lists.length > 0 ?
          lists.map((list, key) => (
            <List title={list.title} tasks={list.tasks} listId={list.id} key={key} index={key} />
          ))
          : ""
        }
        <div>
          <ActionButton lists={lists} />
        </div>
      </div>
    </Layout>
  )
}


index.auth = true;