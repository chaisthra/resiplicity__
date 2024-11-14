export async function POST(req) {
    const body = await req.json();
  
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "2a6b576af31790b470f0a8442e1e9791213fa13799cbb65a9fc1436e96389574",
        input: {
          prompt: body.prompt,
          hf_lora: "alvdansen/frosting_lane_flux",
          lora_scale: 0.8,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 80,
          prompt_strength: 0.8,
          num_inference_steps: 4
        },
      }),
    });
  
    if (response.status !== 201) {
      let error = await response.json();
      return new Response(JSON.stringify({ detail: error.detail }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const predictionId = searchParams.get("id");
  
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    if (response.status !== 200) {
      let error = await response.json();
      return new Response(JSON.stringify({ detail: error.detail }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }