import { BASE_URL } from "./env";

export type TagRaw = {
  id: number;
  attributes: {
    name: string;
  };
};

export class Tag {
  id: number;
  name: string;

  constructor(data: TagRaw) {
    ({
      id: this.id,
      attributes: { name: this.name },
    } = data);
  }
}

export type PostRaw = {
  id: number;
  attributes: {
    title: string;
    summary: string;
    content: string;
    date: string;
    cover: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      } | null;
    };
    tags: {
      data: TagRaw[];
    };
  };
};

export class Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: Date;
  cover?: { url: string; alternativeText: string };
  tags: Tag[];

  constructor(data: PostRaw) {
    let rawTags;
    let date;
    let coverData;

    ({
      id: this.id,
      attributes: {
        title: this.title,
        summary: this.summary,
        content: this.content,
        date: date,
        cover: { data: coverData },
        tags: { data: rawTags },
      },
    } = data);

    if (coverData != null) {
      this.cover = {
        alternativeText: coverData.attributes.alternativeText,
        url: `${BASE_URL}${coverData.attributes.url}`,
      };
    }

    this.tags = rawTags.map((raw) => new Tag(raw));
    this.date = new Date(date);
  }
}
