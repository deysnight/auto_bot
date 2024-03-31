interface IGlobalData {
  taskIdList: string[];

  load(): void;
  save(): void;
}

export default IGlobalData;
