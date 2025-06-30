"use client";

import React from "react";
import { ClientType } from "../types/client-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "../schemas/client-schema";
import { ClientFormData } from "../types/client-types";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ClientFormProps {
  client?: ClientType | null;
  loading?: boolean;
  onSubmit: (data: ClientFormData, clientId?: string) => void;
  onCancel?: () => void;
}

export default function ClientForm({
  client,
  loading,
  onSubmit,
  onCancel,
}: ClientFormProps) {
  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: client
      ? {
          name: client.name ?? "",
          active: client.active ?? true,
          departments: client.departments ?? [],
          status: client.status ?? "",
          url: client.url ?? "",
          plan_id: client.plan_id ?? "",
        }
      : {
          name: "",
          active: true,
          departments: [],
          status: "",
          url: "",
          plan_id: "",
        },
  });

  const { handleSubmit, control } = form;

  const handleFormSubmit = (data: ClientFormData) => {
    onSubmit(data, client?.id);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
        id="client-form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="active"
            control={control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Active</FormLabel>
                </div>

                <FormDescription>
                  If inactive, client will not be shown in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="departments"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departments</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. HR, Finance, IT"
                    value={
                      field.value
                        ? Array.isArray(field.value)
                          ? field.value.join(", ")
                          : field.value
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const departments = value
                        ? value
                            .split(",")
                            .map((dept) => dept.trim())
                            .filter(Boolean)
                        : [];
                      field.onChange(departments);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter departments separated by commas (e.g. HR, Finance, IT)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="status"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="url"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className=""
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="">
            {loading ? "Saving..." : client ? "Update Client" : "Create Client"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
