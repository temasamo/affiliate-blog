"use client";
import React from "react";

export default function DiagnosisResult({ children, params }:{ children?:React.ReactNode, params:any }) {
  return (
    <div className="p-6">
      <div className="text-lg font-semibold">診断結果（仮）</div>
      <pre className="mt-3 text-xs bg-gray-50 p-3 rounded-lg border">{JSON.stringify(params, null, 2)}</pre>
      {children}
    </div>
  );
}
