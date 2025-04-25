'use client';

import React, { useEffect, useRef } from 'react';

interface DraggablePointProps {
  x: number;
  y: number;
  onChange: (x: number, y: number) => void;
  color?: string;
}

const DraggablePoint: React.FC<DraggablePointProps> = ({ x, y, onChange, color = 'red' }) => {
  const pointRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = (clientX: number, clientY: number) => {
    const parent = pointRef.current?.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const newX = clientX - rect.left;
    const newY = clientY - rect.top;
    onChange(newX, newY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      updatePosition(e.clientX - 15, e.clientY - 15);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (dragging.current) {
      updatePosition(e.touches[0].clientX-30, e.touches[0].clientY-30);
    }
  };

  const handleEnd = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  return (
    <div
      ref={pointRef}
      className="absolute flex items-center justify-center"
      style={{
        left: x - 25,
        top: y - 25,
        width: 50,
        height: 50,
        border: `2px solid ${color}`,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        textAlign: 'center',
        cursor: 'grab',
        userSelect: 'none',
        color: `${color}`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className={`absolute h-full w-[1px]`} style={{backgroundColor: color}}/>
      <div className={`absolute w-full h-[1px]`} style={{backgroundColor: color}}/>
    </div>
  );
};

export default DraggablePoint;
