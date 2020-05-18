#include "random_numbers.hpp"

std::mt19937 gen;
bool initialized = false;

double randomDouble(double start, double end) {
	if (!initialized) {
		std::random_device rd;
		gen = std::mt19937(rd());
		initialized = true;
	}
	std::uniform_real_distribution<double> dis(start, end);
	return dis(gen);
}
