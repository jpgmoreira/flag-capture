#pragma once

#include <random>

extern std::mt19937 gen;

/**
	Returns random double in the range [start, end].
*/
double randomDouble(double start, double end);
