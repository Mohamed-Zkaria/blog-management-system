export class CreateBlogsDTO{
    title: string;
    description: string;
    tags: string;
}

export class UpdateBlogsDTO{
    title?: string;
    description?: string;
    tags?: string;
}