#include "random_numbers.hpp"

std::mt19937 gen;
bool initialized = false;

void initRandom() {
	std::random_device rd;
	gen = std::mt19937(rd());
	initialized = true;
}

double randomDouble(double start, double end) {
	if (!initialized)
		initRandom();
	std::uniform_real_distribution<double> dis(start, end);
	return dis(gen);
}

int randomInt(int start, int end) {
	if (!initialized)
		initRandom();
	std::uniform_int_distribution<int> dis(start, end);
	return dis(gen);	
}
