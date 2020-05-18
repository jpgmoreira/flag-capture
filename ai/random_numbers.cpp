#include "random_numbers.hpp"

std::mt19937 gen;
bool initialized = false;

void randomInit() {
	std::random_device rd;
	gen = std::mt19937(rd());
	initialized = true;
}

double randomDouble(double start, double end) {
	if (!initialized)
		randomInit();
	std::uniform_real_distribution<double> dis(start, end);
	return dis(gen);
}

int randomInt(int start, int end) {
	if (!initialized)
		randomInit();
	std::uniform_int_distribution<int> dis(start, end);
	return dis(gen);	
}
