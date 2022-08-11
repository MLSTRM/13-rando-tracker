declare module "memoryjs" {
  // data type constants
  const BYTE: 'byte';
  const INT: 'int';
  const INT32: 'int32';
  const UINT32: 'uint32';
  const INT64: 'int64';
  const UINT64: 'uint64';
  const DWORD: 'dword';
  const SHORT: 'short';
  const LONG: 'long';
  const FLOAT: 'float';
  const DOUBLE: 'double';
  const BOOL: 'bool';
  const BOOLEAN: 'boolean';
  const PTR: 'ptr';
  const POINTER: 'pointer';
  const STR: 'str';
  const STRING: 'string';
  const VEC3: 'vec3';
  const VECTOR3: 'vector3';
  const VEC4: 'vec4';
  const VECTOR4: 'vector4';

  type DataTypes = BYTE | INT | INT32 | UINT32 | INT64 | UINT64 | DWORD | SHORT | LONG | FLOAT | DOUBLE | BOOL | BOOLEAN | PTR | POINTER | STR | STRING | VEC3 | VECTOR3 | VEC4 | VECTOR4;

  // signature type constants
  const NORMAL: 0x0;
  const READ: 0x1;
  const SUBTRACT: 0x2;

  // function data type constants
  const T_VOID: 0x0;
  const T_STRING: 0x1;
  const T_CHAR: 0x2;
  const T_BOOL: 0x3;
  const T_INT: 0x4;
  const T_DOUBLE: 0x5;
  const T_FLOAT: 0x6;

  // Memory access types.
  // See: https://docs.microsoft.com/en-gb/windows/desktop/Memory/memory-protection-constants
  const PAGE_NOACCESS: 0x01;
  const PAGE_READONLY: 0x02;
  const PAGE_READWRITE: 0x04;
  const PAGE_WRITECOPY: 0x08;
  const PAGE_EXECUTE: 0x10;
  const PAGE_EXECUTE_READ: 0x20;
  const PAGE_EXECUTE_READWRITE: 0x40;
  const PAGE_EXECUTE_WRITECOPY: 0x80;
  const PAGE_GUARD: 0x100;
  const PAGE_NOCACHE: 0x200;
  const PAGE_WRITECOMBINE: 0x400;
  const PAGE_ENCLAVE_UNVALIDATED: 0x20000000;
  const PAGE_TARGETS_NO_UPDATE: 0x40000000;
  const PAGE_TARGETS_INVALID: 0x40000000;
  const PAGE_ENCLAVE_THREAD_CONTROL: 0x80000000;

  // Memory allocation types.
  // See: https://docs.microsoft.com/en-us/windows/desktop/api/memoryapi/nf-memoryapi-virtualallocex
  const MEM_COMMIT: 0x00001000;
  const MEM_RESERVE: 0x00002000;
  const MEM_RESET: 0x00080000;
  const MEM_TOP_DOWN: 0x00100000;
  const MEM_RESET_UNDO: 0x1000000;
  const MEM_LARGE_PAGES: 0x20000000;
  const MEM_PHYSICAL: 0x00400000;

  // Page types.
  // See: https://docs.microsoft.com/en-us/windows/desktop/api/winnt/ns-winnt-_memory_basic_information
  const MEM_PRIVATE: 0x20000;
  const MEM_MAPPED: 0x40000;
  const MEM_IMAGE: 0x1000000;

  // Hardware registers
  const DR0: 0x0;
  const DR1: 0x1;
  const DR2: 0x2;
  const DR3: 0x3;

  // Hardware breakpoint trigger types
  const TRIGGER_EXECUTE: 0x0;
  const TRIGGER_ACCESS: 0x3;
  const TRIGGER_WRITE: 0x1;

  interface Process {
      dwSize: number;
      th32ProcessID: number;
      cntThreads: number;
      th32ParentProcessID: number;
      pcPriClassBase: number;
      szExeFile: string;
      modBaseAddr: number;
      handle: number;
  }

  interface Module {
      modBaseAddr: number;
      modBaseSize: number;
      szExePath: string;
      szModule: string;
      th32Processid: number;
  }

  interface Result {
      returnValue: number;
      exitCode: number;
  }

  function openProcess(processIdentifier: string): Process;
  function openProcess(processIdentifier: string, callback: (error: any, processObject: Process)=>any): void;

  function getProcesses(): Process[];
  function getProcesses(callback?: (error: any, processes: Process[])=>any): void;

  function findModule(moduleName, processId): Module;
  function findModule(moduleName, processId, callback: (error: any, module: Module) => any): void;

  function getModules(processId, callback: (error: any, modules: Module[])=>any): void;
  function getModules(processId): Module[];

  function readMemory(handle, address, dataType: DataTypes, callback): void;
  function readMemory(handle, address, dataType: DataTypes): any;

  function readBuffer(handle, address, size, callback): void;
  function readBuffer(handle, address, size): Buffer;

  function writeMemory(handle, address, value, dataType): void;

  function writeBuffer(handle, address, buffer): void;

  function findPattern(handle, moduleName, signature, signatureType, patternOffset, addressOffset): any;
  function findPattern(handle, moduleName, signature, signatureType, patternOffset, addressOffset, callback: (error:any, pattern: any)=>any): void;

  function callFunction(handle, args, returnType, address, callback): void;
  function callFunction(handle, args, returnType, address): any;

  function virtualAllocEx(handle, address, size, allocationType, protection, callback): void;
  function virtualAllocEx(handle, address, size, allocationType, protection): any;

  function virtualProtectEx(handle, address, size, protection, callback): void;
  function virtualProtectEx(handle, address, size, protection): any;

  function getRegions(handle, getOffsets, callback): void;
  function getRegions(handle, getOffsets): any;

  function virtualQueryEx(handle, address, callback): void;
  function virtualQueryEx(handle, address): any;

  function attachDebugger(processId: any, exitOnDetatch: boolean): any;
  function detatchDebugger(processId: any): any;
  function awaitDebugEvent(hardwareRegister: any, millisTimeout: number): any;
  function handleDebugEvent(processId: any, threadId: any): any;
  function setHardwareBreakpoint(processId: any, address: any, hardwareRegister: any, trigger: any, length: any): any;
  function removeHardwareBreakpoint(processId: any, hardwareRegister: any);

  declare class Debugger{

  }

  declare function closeProcess(): any;
}