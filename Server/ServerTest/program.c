#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>


int main(int argc, char **argv)
{
    FILE *fp = NULL;
    char *name = argv[1];
    strcat(name, ".txt");
    printf("%s",name);
    fp = fopen( name ,"w");
    sleep(5);
    remove(name);
}