'use client';

import React, { useRef, useState } from 'react';
import DraggablePoint from '@/components/DraggablePoint';
import { Button, TextField } from '@mui/material';
import ReferenceDialog from '@/components/ReferenceDialog';

interface Point {
  x: number;
  y: number;
}

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [point1, setPoint1] = useState<Point>({ x: 100, y: 100 });
  const [point2, setPoint2] = useState<Point>({ x: 200, y: 100 });
  const imageRef = useRef<HTMLImageElement>(null);
  const [refDistanceCm, setRefDistanceCm] = useState<number|null>(null);
  const [refDistancePx, setRefDistancePx] = useState<number|null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReferenceButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDialogOpen(true);
  }
  const getDistance = () => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getDistanceBetween = (p1: Point, p2: Point) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy).toFixed(2);
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-gray-100 text-gray-900' translate='no'>
      <header className="w-full mb-10 border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <SidebarTrigger /> */}
            <h1 className="text-xl font-semibold text-gray-900">SimRuller</h1>
          </div>
        </div>
      </header>
      <h1 className="text-xl font-bold mb-4">Dynamic Scale</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 text-center" />
      <div className='flex flex-col items-center justify-center p-10'>
        <main className="flex flex-col items-center justify-center bg-white touch-pinch-zoom overscroll-contain">
          {imageSrc && (
            <div
              className="relative"
              style={{ width: '100%', maxWidth: 400 }}
            >
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Uploaded"
                className="w-full select-none pointer-events-none"
                />
                {
                  refDistanceCm && refDistancePx && (
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <line
                        x1={point1.x}
                        y1={point1.y}
                        x2={point2.x}
                        y2={point2.y}
                        stroke="white"
                        strokeWidth="1"
                      />
                    </svg>
                  )
                }
              <DraggablePoint x={point1.x} y={point1.y} onChange={(x, y) => setPoint1({ x, y })} color="red" />
              <DraggablePoint x={point2.x} y={point2.y} onChange={(x, y) => setPoint2({ x, y })} color="blue" />
            </div>
          )}
        </main>
      </div>
      {imageSrc && (
        <>
          <ReferenceDialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onSave={(value) => {
              setRefDistanceCm(value);
              setRefDistancePx(getDistance());
              setDialogOpen(false);
            }}
          />
          {!refDistanceCm && (
            <Button onClick={handleReferenceButtonClick} variant="contained">Salvar referência</Button>
          )}
          {
            (refDistanceCm && refDistancePx) && (
              <p className="my-4 text-gray-600">
                Distância real entre os pontos (cm): <strong>{(getDistance()*(refDistanceCm/refDistancePx)).toFixed(2)}cm</strong>
              </p>
          )}
        </>
      )}
    </div>
  );
}
