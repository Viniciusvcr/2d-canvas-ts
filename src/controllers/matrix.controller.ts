import { Shape, Point } from "../models";

export function generateMatrix(objects: Shape[]) {
  const matrix: number[][] = [[], [], []];

  for (const obj of objects) {
    const points = obj.points;

    for (const point of points) {
      matrix[0].push(point.x);
      matrix[1].push(point.y);
      matrix[2].push(1);
    }
  }

  return matrix;
}

export function getCoordinates(matrix: number[][]) {
  const newCoordinates: Point[] = [];

  for (const i in matrix[0]) {
    newCoordinates.push({
      x: matrix[0][i],
      y: matrix[1][i],
    });
  }

  return newCoordinates;
}

export function getCoordinatesForObject(
  matrix: Point[],
  start: number,
  type: string
): [number, Point[]] {
  let qntd = 0;

  if (type === "Circle") {
    qntd = 5;
  } else if (type === "Line") {
    qntd = 2;
  } else if (type === "Rectangle") {
    qntd = 4;
  } else if (type === "Triangle") {
    qntd = 3;
  }

  const coordinates = [];
  for (let i = 0; i < qntd; i++) {
    coordinates.push(matrix[start + i]);
  }

  return [qntd + start, coordinates];
}

export function matrixMultiply(a: number[][], b: number[][]) {
  const bCols = transpose(b);

  return a.map((aRow) => bCols.map((bCol: number[]) => dotProduct(aRow, bCol)));
}

// dotProduct :: Num a => [[a]] -> [[a]] -> [[a]]
const dotProduct = (xs: number[], ys: number[]) =>
  sum(zipWith(product, xs, ys));

// GENERIC

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith = (f: Function, xs: number[], ys: number[]) =>
  xs.map((x, i) => f(x, ys[i]));

// transpose :: [[a]] -> [[a]]
const transpose = (xs: number[][]) =>
  xs[0].map((_, iCol) => xs.map((row) => row[iCol]));

// sum :: (Num a) => [a] -> a
const sum = (xs: number[]) => xs.reduce((a, x) => a + x, 0);

// product :: Num a => a -> a -> a
const product = (a: number, b: number) => a * b;
