import type { Tag, TagPage, CreateTagPayload, UpdateTagPayload } from "../types/tag";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function createTag(payload: CreateTagPayload): Promise<Tag> {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tags/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return handleResponse<Tag>(res);
}

export async function listTags(
  page: number = 0,
  size: number = 10,
  sort: string = "createdAt,desc"
): Promise<TagPage> {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/tags?page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  return handleResponse<TagPage>(res);
}

export async function getTagById(idTag: string): Promise<Tag> {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tags/${idTag}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return handleResponse<Tag>(res);
}

export async function updateTag(
  idTag: string,
  payload: UpdateTagPayload
): Promise<Tag> {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tags/${idTag}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return handleResponse<Tag>(res);
}

export async function deleteTag(idTag: string): Promise<void> {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tags/${idTag}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Error ${res.status}`);
  }
}
