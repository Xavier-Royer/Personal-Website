import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/database/database";
import blogSchema from "@/src/database/projectSchema";

import { ObjectId } from "mongodb";
import Blog from "@/src/database/blogSchema";

/* IParams is a TypeScript type definition that describes the structure of the second
   argument that Next.js passes to our API route handler.

   Without IParams:
   - TypeScript wouldn't know what properties the second argument contains
   - We'd lose autocomplete and type checking
   - Typos like { slug } vs { slg } wouldn't be caught until runtime

   With IParams:
   - TypeScript knows the second argument has a "params" object
   - TypeScript knows "params" contains a "slug" property that's a string
   - We get autocomplete when typing { params } and { slug }
   - TypeScript catches errors if we try to access non-existent properties

   Note: IParams doesn't control what Next.js creates - it just tells TypeScript
   what to expect. The actual object structure is determined by our file path:
   /api/blog/[slug]/route.ts creates { params: { slug: "actual-slug-value" } }
*/
type IParams = {
  params: {
    slug: string;
  };
};

/*
	The function below and the functions you create inside route.ts files are called
	"API route handlers" 
	
	Next.js automatically passes two arguments to API route handlers:
		1. First argument: NextRequest - The incoming HTTP request object
		2. Second argument: NextJS Object - Contains route information and other metadata
				There is ALWAYS a "params" object here but the object within is based on our
				api path naming which in this case is "slug"
	We need to include req, even though we don't use it here, so that we can access
	the second argument
*/

/*export async function GET(req: NextRequest, { params }: IParams) {
		// If { params } looks confusing, check the note below this code block
    await connectDB() // function from db.ts before
		const  { slug } = params // another destructure

	   try {
	        const blog = await blogSchema.findOne({ slug }).orFail()
	        return NextResponse.json(blog)
	    } catch (err) {
	        return NextResponse.json('Blog not found.', { status: 404 })
	    }
}
*/

export const runtime = "nodejs";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ slug: string }> } 
) {
  await connectDB();

  const { slug } = await ctx.params; 

  const raw = await req.text();
  let body: any = {};
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", raw },
      { status: 400 }
    );
  }

  const user = String(body.user ?? "").trim();
  const comment = String(body.comment ?? "").trim();
  const time = body.time ? new Date(body.time) : new Date();

  if (!slug?.trim() || !user || !comment) {
    return NextResponse.json(
      {
        error: "Missing fields",
        got: {
          slug,
          keys: Object.keys(body),
          user,
          commentLen: comment.length,
        },
      },
      { status: 400 }
    );
  }

  const filter = { slug: slug.trim() };

  const result = await Blog.updateOne(filter, {
    $push: { comments: { user, comment, time } },
  });

  if (!result.matchedCount) {
    return NextResponse.json(
      { error: "Blog not found (slug mismatch)" },
      { status: 404 }
    );
  }
  if (!result.modifiedCount) {
    return NextResponse.json(
      { error: "Matched blog, but no append. Ensure comments is an array." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

//export async function GET(req: Request, { params }: { params: { slug: string } }) {
//  return// //NextResponse.json({ ok: true, slug: params.slug });
//}
