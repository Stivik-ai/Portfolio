import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";
import { ZodError } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Validation error formatter
function formatZodErrors(error: ZodError): Record<string, string[]> {
  return error.errors.reduce(
    (acc, err) => {
      const path = err.path.join(".");
      if (!acc[path]) acc[path] = [];
      acc[path].push(err.message);
      return acc;
    },
    {} as Record<string, string[]>
  );
}

// Simple HTML email template
function createEmailHTML(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #000; }
          .message-box { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; color: #000;">New Contact Form Submission</h2>
          </div>
          <div class="field">
            <span class="label">Name:</span> ${data.name}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${data.email}
          </div>
          <div class="field">
            <span class="label">Subject:</span> ${data.subject}
          </div>
          <div class="message-box">
            <div class="label" style="margin-bottom: 10px;">Message:</div>
            <div>${data.message}</div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validatedData = contactFormSchema.parse(body);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: "szymonpiekarz09@gmail.com",
      replyTo: validatedData.email,
      subject: `Contact Form: ${validatedData.subject}`,
      html: createEmailHTML(validatedData),
    });

    // Handle Resend errors
    if (error) {
      console.error("Resend error:", error);

      // Handle specific error types
      if (error.message?.includes("invalid")) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid email configuration. Please contact support.",
          } as ApiResponse,
          { status: 400 }
        );
      }

      if (error.message?.includes("rate")) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many requests. Please try again later.",
          } as ApiResponse,
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please try again later.",
        } as ApiResponse,
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        data: { id: data?.id },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(error),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Unknown server error
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}